/* global QUnit */

QUnit.test("Button click", function (assert) {
    var $con_imp = $(".con_imp:first");

    $con_imp.on("click", function () {
        assert.ok(true, "Impressum wurde geklickt!");
    });

    $con_imp.trigger("click");
});

QUnit.test( "Check AJAX-functions", function( assert ) {
  var done = assert.async(16);

  setTimeout(function() {
    assert.ok(login(), "login() works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.equal(isLoggedIn(), 'loggedOut', "isLoggedIn() works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(itemsCarousel(), "itemsCarousel() works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfAllCustomers() , "findItemsOfAllCustomers()  works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(createFilter() , "createFilter() works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfPersonType('Frauen') , "findItemsOfPersonType('Frauen') works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfPersonType('Männer') , "findItemsOfPersonType('Männer') works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfPersonType('Jungen') , "findItemsOfPersonType('Jungen') works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfPersonType('Mädchen') , "findItemsOfPersonType('Mädchen') works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    assert.ok(findItemsOfPersonType('Babys') , "findItemsOfPersonType('Babys') works" );
    done();
  }, 500 );
  
  setTimeout(function() {
    setCookie(1); //set the ID from a Default Customer
    assert.ok(myItems() , "myItems() works with default Customer" );
    done();
    document.cookie = 'customerId=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  }, 500 );
  
  setTimeout(function() {
    assert.ok(updateItem(411), "updateItem() works with default Item" );
    done();
  }, 500 );

  setTimeout(function() {
    assert.ok(sendRegisterMail('Hello that is a test', 'test user', 'test header'), "sendRegisterMail(mail, name, subject) works" );
    done();
  }, 500 );  
  
  setTimeout(function() {
    assert.ok(addItemMail('Hello that is a test', 'test user', 'test header'), "addItemMail(mail, name, subject) works" );
    done();
  }, 500 );  
  
    setTimeout(function() {
    assert.ok(delItemMail('Hello that is a test', 'test user', 'test header'), "delItemMail(mail, name, subject) works" );
    done();
  }, 500 );   
  
      setTimeout(function() {
    assert.ok(delProfileMail('Hello that is a test', 'test user', 'test header'), "delProfileMail(mail, name, subject) works" );
    done();
  }, 500 );     
});
