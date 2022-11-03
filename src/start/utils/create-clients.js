/** 
 * CREATE-CLIENTS
 */

export default function createClients(type, createFn, config) {
    const _default = config.default; 
    const clients = config.clients; 

    const context = {} 
    const _clients = context["_" + type] = {};

    for(let clientName in clients) {
        _clients[clientName] = createFn(clientName, config); 
    }

    context[type] = (client = _default) => _clients[_default]; 

    return context;
}