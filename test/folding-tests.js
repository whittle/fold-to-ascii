const ASCIIFolder = require("./../lib/ascii-folder.js");

QUnit.test("replaces unknown characters", assert => {
    assert.equal(ASCIIFolder.foldReplacing("Lorem ipsum dôlor sit amêt, pri at cetèro ëripuît inérmis.", "x"), "Lorem ipsum dolor sit amet, pri at cetero eripuit inermis.", "string with diacritics");
    // "🤧😇".length == 2 (https://blog.jonnew.com/posts/poo-dot-length-equals-two)
    assert.equal(ASCIIFolder.foldReplacing("Lorem 🤧😇 Ipsum", "x"), "Lorem xxxx Ipsum", "string with emojis");
    assert.equal(ASCIIFolder.foldReplacing("お早うございます", "x"), "xxxxxxxx", "string with Kanji characters");
    assert.equal(ASCIIFolder.foldReplacing("⑴ ½ ⒉ ⅚ ⑦ ⅜ ㆔", "x"), "(1) 1/2 2. 5/6 7 3/8 x", "string with numbers");
});

QUnit.test("omits unknown characters", assert => {
    assert.equal(ASCIIFolder.foldReplacing("Lorem ipsum dôlor sit amêt, pri at cetèro ëripuît inérmis.", ""), "Lorem ipsum dolor sit amet, pri at cetero eripuit inermis.", "string with diacritics");
    assert.equal(ASCIIFolder.foldReplacing("Lorem 🤧😇 Ipsum", ""), "Lorem  Ipsum", "string with emojis");
    assert.equal(ASCIIFolder.foldReplacing("お早うございます", ""), "", "string with Kanji characters");
    assert.equal(ASCIIFolder.foldReplacing("⑴ ½ ⒉ ⅚ ⑦ ⅜ ㆔", ""), "(1) 1/2 2. 5/6 7 3/8 ", "string with numbers");
});

QUnit.test("maintains unknown characters", assert => {
    assert.equal(ASCIIFolder.foldMaintaining("Lorem ipsum dôlor sit amêt, pri at cetèro ëripuît inérmis."), "Lorem ipsum dolor sit amet, pri at cetero eripuit inermis.", "string with diacritics");
    assert.equal(ASCIIFolder.foldMaintaining("Lorem 🤧😇 Ipsum"), "Lorem 🤧😇 Ipsum", "string with emojis");
    assert.equal(ASCIIFolder.foldMaintaining("お早うございます"), "お早うございます", "string with Kanji characters");
    assert.equal(ASCIIFolder.foldMaintaining("⑴ ½ ⒉ ⅚ ⑦ ⅜ ㆔"), "(1) 1/2 2. 5/6 7 3/8 ㆔", "string with numbers");
});
