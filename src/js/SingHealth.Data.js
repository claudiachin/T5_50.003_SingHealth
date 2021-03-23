//only trying to mirror the FriendlyEats sample online, aka blind code (to figure out naming convention of xxx.prototype and xxx.yyy.js); unfinished

'use strict';

Singhealth.prototype.addTenant = function (data) {
  const collection = firebase.firestore().collection('tenants');
  return collection.add(data);
};


SingHealth.prototype.addAuditor = function (data) {
  const collection = firebase.firestore().collection('auditors');
  return collection.add(data);
};

Singhealth.prototype.getAllTenants = function(renderer) {
  var query = firebase.firestore()
      .collection('tenants')
      .orderBy('avgRating', 'desc')
      .limit(50);
//avgRating as the score gotten or smth
  this.getDocumentsInQuery(query, renderer);
};
