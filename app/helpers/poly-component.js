import Ember from 'ember';
import PolyComponentView from 'ember-cli-poly-component/views/poly-component';

var assert = Ember.assert;
var Helper = Ember.HTMLBars.Helper;

function helperFunc(params, hash, options, env) {

  hash['_componentName']    = params[0];
  hash['_propertiesToBind'] = params[1];
  hash['_properties']       = hash;

  return env.helpers.view.helperFunction.call(this, [PolyComponentView], hash, options, env);
}

export default {
  isHTMLBars: true,
  helperFunction: helperFunc
}
