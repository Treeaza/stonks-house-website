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
