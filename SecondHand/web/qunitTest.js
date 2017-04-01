QUnit.test("Button click", function (assert) {
    var $con_imp = $(".con_imp:first");

    $con_imp.on("click", function () {
        assert.ok(true, "Impressum wurde geklickt!");
    });

    $con_imp.trigger("click");
});