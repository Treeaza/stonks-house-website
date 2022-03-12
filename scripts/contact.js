const BLOCKER = document.querySelector("#blocker");
const CODE_BOX = document.querySelector("#code-box");
const FORM = document.querySelector("#code");

let CODE_HASHES = ["U2FsdGVkX1+sHGlt9p+PJ/D3xVDHbDZ/zxC5j8sIkBQ=",];

let PAGE_HASHES = ["U2FsdGVkX1+oCDB5PvbzSXx41avIBl5KQPkz2PXCWs1J2K347wuierNJtF1sI1RdPITpRn5U6q9tPR1xPDMX3wetZ6aihiqOvLeVeRVfmLmCvtMaKIV9AyoUGhYsGDSSOaj3sdg4/YvMAapVLhjOYUv3OMNncRIFVwISOGqLi9NirbSiLG0eGqjYOyGq+GdgDl8ogeLysJLSvkcb5V3agPjj5KGKCfO93e+9jhX1DreU9oYKUJliodx7CT6lx8b1lCQYi14PpJfOQ4JvvbqA1jv0Ya9RCB+k/1f3Op5xeOApFeN+E24nDycqDNbnvONV8oxJ7bg8bv0nkL8wXYvaCzxRUhah5dLuXzLGMEZIwumX3O2J9+7yJVgsK0953cr325+wPU8rKkUSFb90CegayrFpsRDs9Rl001Bu7CVi1eYcLwZBbuQ7UcJR9UpS+FqkzFFhF7JYQQ/PS3V0508E+dIjrDiL9NiOZ9qEYiVKzfQs5M7plLYLkfwl4hw1OW0SmoUZtu2cCN3ESqpioGRnH5uUzJBXuTjbzjRqGL66LxgsLyY/1cce3Gks17V26Wf9rZhpmfC/B1DBV6SEn4Kcv430WmNF1iDdf/aGEVhDcOL4eQztZCgsF31qbx3cQJ1YyQhm4wRk4bvW0LnqQhfWMpe1fZmiaUvcHXkZKx9SN71Y00vDAHKR5CqtLs3PaFiVDQtUAOCNFHNPP1iq4yKHpcv2OQBNRQ4l8FeWLweIekkNyNqlMrhuusV29Kaml0z5lERCoZYCp+qVmK4IQqn6AlLUSr8LzjLpg0zOJPTyJteB6dM+7RABS3FLDLkYangxk7BuFAIofkQwfodjY79RiVgFceEtM9ragjVJIBQuU5jpkd7iG70kV8rKYwjg9WmKYKoMXa8WxuSHoPyCmqLbHie23mWmPalmbjUTQU9d7xa97jBSFP1HJGHH58kAgYb9eM28J3Yyn91SM6wIENmjP0qH2Mf46a77DbDNV5za6NADQArbwYlAzfedbe/l+pAtrvSDIALTM2GA5lz51c25tBbv1VvXtbgF6LO3YJAo1EzNiSC3Z4KsGjOq5jR36hrpXwH3fdBNiyzEVszEkwbZKbrq9xfe8pdvhYrlH1fAo7I7BvZT8Bkde5oFGJE/uk2PsR+LH0VYylBjARM4U4t9AqEeftBdPodBvL4/mwUcudd5sc/UGT4KsI10BkVVXqZWSkr/lzKsek+GOsj0qL86RXCFx+Ez+o6WT5NJDydu+U4p0MujbQ7kAeqfIiDjZWwkI4Y6ObfWSfH92NqOzNFRbiDEEK9rfdbErdrUg89uZu4QnqoTwkpfI0hWVdRKvI+aj6QXAObrhG7u9BwszJczmmpNmzXvaXt4sIyhzs4QhA8UAhZEFJf4UX5IO0nvltbTzpCTusZ+KfA8tAjbHzGdISZkad/U5dcGmEgI80ABOIJFt/du9O6FDi7J/os4H8ENopoAzjTtfrrpAQbHN2aHgw38Y5mPazPHg8Ey9BwFMcS8RlCSHrNLwzULroxO+L50DOzKU9WW6TFlzwIDzNoG5vj7gJMC+LnnWt6+SMqaXNnj2XmuuxUgtQLYo9/MRQD1Ho5F9GqxE4x0bmXghcuqdPy1N2o5EN1m+vFBU/8QhRol5IspyJWwBiqHJrgrBktN7u5LHuxoQAyvb6m1C1rk8ZLZiDWG3CR2NBqJ2su9avP6xrhCMcYG9tKu7IjVUljK"];

// ripping these straight from index.js
// they should really be in their own file but oh well, I'm lazy
function encrypt(code, content) {
    return CryptoJS.AES.encrypt(content, code).toString();
}

function decrypt(code, content) {
    let bytes = CryptoJS.AES.decrypt(content, code);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function checkCode(code) {
    console.log("Checking code " + code);
    if (code == "")
        return { valid: false, index: 0 };

    // try decrypting all the codes
    // if we find one that works, it's valid
    for (var hashIndex in CODE_HASHES) {
        var result = ""
        try {
            result = decrypt(code, CODE_HASHES[hashIndex])
        } catch (err) {
            result = ""
        }
        if (result == code)
            return { valid: true, index: hashIndex };
    }

    return { valid: false, index: 0 };
}

function unlockPage(index, code) {
    if (index >= PAGE_HASHES.length)
        return false;

    // decrypt the page
    var page = decrypt(code, PAGE_HASHES[index]);

    // start the close animation and swap pages
    setTimeout(function () {
        console.log("GOODBYE WORLD!");
        document.open();
        document.write(page);
        document.close();
    }, 3000);

    setTimeout(function () {
        BLOCKER.style.opacity = "1";
    }, 500);

    return true; // for what it's worth, I always believed you
}

function reset() {
    CODE_BOX.value = "";
    CODE_BOX.style.backgroundColor = "red";
    setTimeout(function () {
        CODE_BOX.style.backgroundColor = "white";
    }, 1000)
}

function submitCodeBox() {
    var code = CODE_BOX.value.toUpperCase();

    let { valid, index } = checkCode(code);
    var successful = false;

    if (valid) {
        successful = unlockPage(index, code);
    }

    if (!valid || !successful) {
        reset();
    }

}

FORM.addEventListener("submit", function (event) { event.preventDefault(); submitCodeBox(); });

console.log("contact.js loaded successfully.");
