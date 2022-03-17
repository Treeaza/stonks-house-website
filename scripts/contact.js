const BLOCKER = document.querySelector("#blocker");
const CODE_BOX = document.querySelector("#code-box");
const FORM = document.querySelector("#code");

let CODE_HASHES = [
    "U2FsdGVkX1+sHGlt9p+PJ/D3xVDHbDZ/zxC5j8sIkBQ=",
    "U2FsdGVkX1/JdRBY89sNU5YtPJQP4z1m1y9syrBj89o="
];

let PAGE_HASHES = [
    "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",    
];

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
