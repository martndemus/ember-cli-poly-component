import Ember from 'ember';

var get      = Ember.get;
var observer = Ember.observer;
var on       = Ember.on;

var RE_BINDING = /^.+Binding$/;
var IGNORED_PROPS = [
  '_properties',
  '_propertiesToBindBinding',
  '_componentNameBinding',
  'templateData',
  '_context',
  '_parentView',
  'helperName',
  'container'
];

function mergeBinding(view, source, destination, key) {
  var value = source[key];

  if (RE_BINDING.test(key)) {
    if (typeof value === 'string') {
      destination[key] = view._getBindingForStream(value);
    } else {
      destination[key] = value;
    }
  } else {
    if (value && value.isStream) {
      destination[key + 'Binding'] = view._getBindingForStream(value);
    } else {
      destination[key] = value;
    }
  }
}

export default Ember.ContainerView.extend(Ember._Metamorph, {
  type: null,

  _changeChild: on('init', function() {
    this.clear();
    this.pushObject(this.componentForType());
  }),

  changeChild: observer('_componentName', function() {
    this._changeChild();
  }),

  componentForType: function() {
    var componentName   = get(this, '_componentName');
    var container       = get(this, 'container');
    var componentLookup = container.lookup('component-lookup:main');
    var component = componentLookup.lookupFactory(componentName, container);

    var parentView       = get(this, '_parentView');
    var properties       = get(this, '_properties');

    var props = {};
    var key;

    if (properties && ('_propertiesToBind' in properties)) {
      var label            = properties['_propertiesToBindBinding']._label;
      var propertiesToBind = properties['_propertiesToBindBinding'].value();

      for (key in propertiesToBind) {
        if (!propertiesToBind.hasOwnProperty(key)) { continue; }
        properties[key + 'Binding'] = label + '.' + key.replace(RE_BINDING, '');
      }
    }

    for (key in properties) {
      if (IGNORED_PROPS.indexOf(key) !== -1) { continue; }
      mergeBinding(parentView, properties, props, key);
    }

    return this.createChildView(component, props);
  },
});

