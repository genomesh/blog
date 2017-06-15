function load () {
    fetch("/hits").then((response) => {
        return response.json()
    }).then((nowJson) => {
        document.getElementById("p2").innerHTML = nowJson.hits
    });
}

function submit () {
    let myInfo = {
        User:document.getElementById('usr').value,
        Password:document.getElementById('psw').value,
        img:0
    };
    document.getElementById('psw').value = "";
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch("/login", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(myInfo)
    }).then((res) => {
        return res.json();
    }).then((leJSON) => {
        let head2 = new Headers();
        head2.append('Content-Type', 'application/json');
        for (let m=0;m<leJSON.length;m++) {
            myInfo.img=m;
            fetch("/imagesRequest", {
                method: "POST",
                headers: head2,
                body: JSON.stringify(myInfo)
            }).then((r) => {
                return r.blob();
            }).then((elBlob) => {
                let myImg = document.createElement('img');
                let myDesc = document.createElement('p');
                myDesc.innerHTML=leJSON[m];
                let theURL = URL.createObjectURL(elBlob);
                myImg.src = theURL;
                document.body.insertBefore(myDesc, document.getElementById('p2'));
                document.body.insertBefore(myImg, document.getElementById('p2'));
            }).then(()=>{
                if(m-1==leJSON.length) {myInfo={};}
            })
        }
    })
}