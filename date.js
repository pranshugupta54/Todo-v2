//jshint esversion:6

exports.getDate = function() {

  const today = new Date();

  const options = {
    day: "numeric",
    weekday: "short",
    month: "short"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function () {

  const today = new Date();

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);

};
