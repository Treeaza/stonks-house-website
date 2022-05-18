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
