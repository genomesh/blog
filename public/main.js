function load () {
    fetch("/hits").then(function(response) {
        return response.json()
    }).then(function(nowJson) {
        document.getElementById("p2").innerHTML = nowJson.hits
    });
}

function submit () {
    let usr = document.getElementById('usr').value;
    let psw = document.getElementById('psw').value;
    myInfo = {
        User:usr,
        Password:psw
    };
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch("/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(myInfo)
    }).then(function(res) {
        return res.json();
    }).then(function(leJSON) {
        urlme(leJSON)
    });
}

function urlme (titleArray) {
    console.log("start");
    for (let m=0;m<titleArray.length;m++) {
        console.log(m);
        let head2 = new Headers();
        head2.append('Content-Type', 'application/json');
        fetch("/imagesRequest", {
            method: "POST",
            headers: head2,
            body: JSON.stringify({img:m})
        }).then(function(r){
            return r.blob();
        }).then(function (elBlob) {
            let myImg = document.createElement('img');
            let myDesc = document.createElement('p');
            myDesc.innerHTML=titleArray[m];
            console.log(theURL = URL.createObjectURL(elBlob));
            myImg.src = theURL;
            document.body.insertBefore(myDesc, document.getElementById('p2'))
            document.body.insertBefore(myImg, document.getElementById('p2'))
        })
    }
}