function submit () {
    let myName = document.getElementById('name').value;
    let myEmail = document.getElementById('email').value;
    let myComment = document.getElementById('comment').value;
    let myFeedback = {
        name:myName,
        email:myEmail,
        comment:myComment
    };
    document.getElementById('name').value='';
    document.getElementById('email').value='';
    document.getElementById('comment').value=''
    let myHeaders = new Headers();
    myHeaders.append('Content-Type','application/json');
    fetch("/feedback", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(myFeedback)
    })
}