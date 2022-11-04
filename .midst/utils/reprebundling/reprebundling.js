import _readline from 'readline'

const reprebundlingPlugin = async (dep) => {
    var optimizer;
    const originSet = WeakMap.prototype.set;
    WeakMap.prototype.set = function (key, val) {
      const weakMapInstance = this;
  
  
      if (val?.metadata?.hash) {
        console.log(val);
        optimizer = val;
      }
  
      return originSet.bind(weakMapInstance)(key, val);
    };
  
    let prebundleReady = false; 

    const onPrebundlingEnd = async () => {
        if(optimizer?.metadata.depInfoList.length > 0)
            prebundleReady = true; 
        else    
            return false;

        const depInfoList = optimizer.metadata.depInfoList;
        const depInfo = depInfoList[depInfoList.findIndex((info) => info.id == "@/app/index.js")]; 


        delete optimizer.metadata.optimized[depInfo.id];
        delete optimizer.metadata.discovered[depInfo.id];
        optimizer.metadata.hash = ""; // force vite reloading
        
        const readline = _readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
            
        await readline.question('Enter anything to rebundle.', name => {
            console.log(`Ok...`);

            console.log("Rebundling...");
            optimizer.registerMissingImport(depInfo.id, depInfo.src);
            readline.close();
        });

    }
  
  
    let watchInterval = setInterval(() => {
      if(!prebundleReady)
        clearInterval(watchInterval);
      onPrebundlingEnd();
    }, 1000);
  
    return {
      name: "reprebundling",
      config() {
        onPrebundlingEnd();
      }
    };
};

export default reprebundlingPlugin;