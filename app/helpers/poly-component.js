import Ember from 'ember';
import PolyComponentView from 'ember-cli-poly-component/views/poly-component';

var assert = Ember.assert;
var Helper = Ember.HTMLBars.Helper;

function helperFunc(params, hash, options, env) {
  Ember.assert("You must pass the component name as the first param of this helper",
               params.length === 1);

  hash['_componentName'] = params[0];
  hash['_properties']    = hash;

  if ('propertiesToBind' in hash) {
    hash['_propertiesToBind'] = hash['propertiesToBind'];
    delete hash['propertiesToBind'];
  }

  return env.helpers.view.helperFunction.call(this, [PolyComponentView], hash, options, env);
}

export default {
  isHTMLBars: true,
  helperFunction: helperFunc

