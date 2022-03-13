const BLOCKER = document.querySelector("#blocker");
const CODE_BOX = document.querySelector("#code-box");
const FORM = document.querySelector("#code");

let CODE_HASHES = ["U2FsdGVkX1+sHGlt9p+PJ/D3xVDHbDZ/zxC5j8sIkBQ=",];

let PAGE_HASHES = ["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"];

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
