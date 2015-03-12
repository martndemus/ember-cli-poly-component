# ember-cli-poly-component
Render any Ember component with any attributes.

# Example
```handlebars
{{poly-component componentName properties}}
```
Where `componentName` is a string value corresponding to the name of a component and
`properties` is a key value object (e.g. `Ember.Object` or just `Object`).

If for example `componentName` would be `person-details` and properties would be:
```
{
  name: 'Jake Bugg',
  email: 'jake.bugg@example.org'
}
```

then the poly-component helper would 'transform' this into:

```handlebars
{{person-details name=properties.name email=properties.email}}
```
