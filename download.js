const fs = require('fs');
fetch('https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q3MWYyMTA2YWJhNjQyNTZiZWY2ZjY0YjM5ZjE1ZTlmEgsSBxDylYXFlgMYAZIBIwoKcHJvamVjdF9pZBIVQhM2NjgxOTI2OTgwNjE1NTk3MzIz&filename=&opi=89354086')
  .then(res => res.text())
  .then(text => fs.writeFileSync('temp.html', text))
  .catch(console.error);
