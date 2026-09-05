const form = document.getElementById("contactForm");
const result= document.getElementById("result");
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim()
    };
    // Clear the previous message 
    document.getElementById("nameError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("messageError").innerHTML="";
    document.getElementById("result").innerHTML = "";
    let hasError = false;
    //validate name 
    if (!data.name.length){
            document.getElementById("nameError").innerHTML= "Please enter your name!";
            hasError= true;
        }
    // validate email 
    if(!data.email.length) {
        document.getElementById("emailError").innerHTML="please enter your email! ";
        hasError=true;
    }
    // validate message 
    if(!data.message.length) {
            document.getElementById("messageError").innerHTML="please enter your message! ";
            hasError=true;
        }
    if(hasError)
    {   
        result.textContent= "There are something wrong , please try it again."
        return;
    }
    try {
        const response = await fetch(
            "64.46.2.68/contactdata.php", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        );
        const resultData = await response.json();
        if (resultData.success) {
            result.textContent = "Message sent successfully!";
            form.reset();
        } else {
            result.textContent = resultData.message||"something went wrong ";
        }

    } catch (error) {
        console.error(error);
        result.textContent = "Unable to send your message. Please try again.";
    }
});
