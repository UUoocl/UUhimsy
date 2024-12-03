
<%* 
const dv = this.app.plugins.plugins["dataview"].api; 
const query = 'LIST';
const result = await dv.queryMarkdown(query); 
if ( result.successful ) { 
tR += result.value } 
else { tR += "~~~~\n" + result.error + "\n~~~~" } 
%>



