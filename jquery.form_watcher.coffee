jQuery.fn.extend
  hash: ->
    hash = ""

    $.each $(@).find(":input"), (i, e) ->
      hash += "&" + e.name + "=" + e.value

    hash.substr 1

  hasChanged: ->
    @data('hash') isnt $(@).hash()

  handleChange: (target) ->
    if $(@).hasChanged()
      $(@).trigger 'watcher.change', target: @ unless $(@).data 'changeTriggered'
      $(@).data 'changeTriggered', true
    else
      $(@).trigger 'watcher.unchange', target: @
      $(@).data 'changeTriggered', false

  reflow: ->
    $(@).data 'hash', $(@).hash()
    $(@).data 'changeTriggered', false
    $(@).trigger 'watcher.unchange', target: @

  watcher: ->
    @each ->
      that = @
      $(@).data 'hash', $(@).hash()

      $(@).on 'keyup', ':input', -> $(that).handleChange @
      $(@).on 'change', 'input[type="file"]', -> $(that).handleChange @

