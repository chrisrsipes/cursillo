angular.module('app').directive('hasAnyRole', ['Principal', function (Principal) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var setVisible = function () {
          element.removeClass('hidden');
        };
        var setHidden = function () {
          element.addClass('hidden');
        };
        var defineVisibility = function (reset) {
          var result;
          if (reset) {
            setVisible();
          }

          result = Principal.isInAnyRole(roles);
          if (result) {
            setVisible();
          } else {
            setHidden();
          }
        };

        var roles = attrs.hasAnyRole ? attrs.hasAnyRole.replace(/\s+/g, '').split(',') : null;

        if (roles && roles.length > 0) {
          defineVisibility(true);
        }
      }
    };
  }]).directive('hasRole', ['Principal', function (Principal) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var setVisible = function () {
        element.removeClass('hidden');
      };
      var setHidden = function () {
        element.addClass('hidden');
      };

      var defineVisibility = function (reset) {

        if (reset) {
          setVisible();
        }

        var result = Principal.isInRole(role);
        if (result) {
          setVisible();
        } else {
          setHidden();
        }
      };

      var role = attrs.hasRole ? attrs.hasRole.replace(/\s+/g, '') : null;

      if (role && role.length > 0) {
        defineVisibility(true);
      }
    }
  };
}]).directive('notInRole', ['Principal', function (Principal) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var setVisible = function () {
        element.removeClass('hidden');
      };

      var setHidden = function () {
        element.addClass('hidden');
      };

      var defineVisibility = function (reset) {
        if (reset) {
          setVisible();
        }

        var result = Principal.isInRole(role);
        if (!result) {
          setVisible();
        } else {
          setHidden();
        }
      };
      var role = attrs.notInRole ? attrs.notInRole.replace(/\s+/g, '') : null;

      if (role && role.length > 0) {
        defineVisibility(true);
      }
    }
  };
}]).directive('notInAnyRole', ['Principal', function (Principal) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var setVisible = function () {
        element.removeClass('hidden');
      };

      var setHidden = function () {
        element.addClass('hidden');
      };

      var defineVisibility = function (reset) {
        var result;
        if (reset) {
          setVisible();
        }

        result = Principal.isInAnyRole(roles);
        if (!result) {
          setVisible();
        } else {
          setHidden();
        }
      };

      var roles = attrs.notInAnyRole ? attrs.notInAnyRole.replace(/\s+/g, '').split(',') : null;

      if (roles && roles.length > 0) {
        defineVisibility(true);
      }
    }
  };
}]);
