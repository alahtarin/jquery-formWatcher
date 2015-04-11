# jQuery Form watcher plugin
Extends the form and triggers event on every form state change. Useful to show message when user leaves the page without saving the form or to show the current form state (changed / unchanged).
Available in coffescript and javascript versions.

## Usage
`$("form(s) selector").watcher()`

After the initialization, plugin will trigger two types of events:
* `watcher.unchange` when the form is returned to it's original state
* `watcher.change` when the form data is changed

## Available methods:
### reflow
Calling this method re-initializes the plugin and current state becomes the original

## Example of usage
```coffeescript
$(@el).watcher()

$(@el).on "watcher.change", ->
  window.onbeforeunload = -> "You have unsaved changes"
  
$(@el).on "watcher.unchange", ->
  window.onbeforeunload = null
