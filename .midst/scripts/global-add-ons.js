/** 
 * Parse Boolean
 */
$app.parseBoolean = (val) => {
    return (val == "true") ? true : (val == "false" ? false : null);
}
