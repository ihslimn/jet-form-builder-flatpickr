import registerAttributes from './attributes';
import './controls';

const {
	      addFilter,
      } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'jfb-flatpickr/block-attributes',
	registerAttributes,
);
