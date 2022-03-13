const BLOCKER = document.querySelector("#blocker");
const CODE_BOX = document.querySelector("#code-box");
const FORM = document.querySelector("#code");

let CODE_HASHES = [
    "U2FsdGVkX1+sHGlt9p+PJ/D3xVDHbDZ/zxC5j8sIkBQ=",
    "U2FsdGVkX1/JdRBY89sNU5YtPJQP4z1m1y9syrBj89o="
];

let PAGE_HASHES = [
    "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"
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
