fetch("https://www.7timer.info/bin/civil.php?lon=49.6&lat=8.4&ac=0&unit=metric&output=json&tzshift=0")
.then(resp => resp.json())
.then(data => console.log(data))