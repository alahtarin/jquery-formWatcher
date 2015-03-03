(function() {
  jQuery.fn.extend({
    hash: function() {
      var hash;
      hash = "";
      $.each($(this).find(":input"), function(i, e) {
        return hash += "&" + e.name + "=" + e.value;
      });
      return hash.substr(1);
    },
    hasChanged: function() {
      return this.data('hash') !== $(this).hash();
    },
    handleChange: function(target) {
      if ($(this).hasChanged()) {
        if (!$(this).data('changeTriggered')) {
          $(this).trigger('watcher.change', {
            target: this
          });
        }
        return $(this).data('changeTriggered', true);
      } else {
        $(this).trigger('watcher.unchange', {
          target: this
        });
        return $(this).data('changeTriggered', false);
      }
    },
    reflow: function() {
      $(this).data('hash', $(this).hash());
      return $(this).data('changeTriggered', false);
    },
    watcher: function() {
      return this.each(function() {
        var that;
        that = this;
        $(this).data('hash', $(this).hash());
        $(this).on('keyup', ':input', function() {
          return $(that).handleChange(this);
        });
        return $(this).on('change', 'input[type="file"]', function() {
          return $(that).handleChange(this);
        });
      });
    }
  });

}).call(this);