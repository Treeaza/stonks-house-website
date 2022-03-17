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
