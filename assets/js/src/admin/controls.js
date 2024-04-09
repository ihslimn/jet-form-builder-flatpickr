import { 
		SELECT_ALL_ENABLED, 
		SELECT_ALL_LABEL, 
		DESELECT_ALL_LABEL, 
		SUPPORTED_BLOCKS,
		ADD_AS_BUTTONS,
		DEFAULT_ALL} from './constants';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;
const { TextControl, ToggleControl, Panel, PanelRow, PanelBody } = wp.components;

const addControls = createHigherOrderComponent( ( BlockEdit ) => {



	return ( props ) => {

		let blockName = props.name,
			supportType = SUPPORTED_BLOCKS[ blockName ] || false;

		if ( ! supportType ) {
			return ( <BlockEdit { ...props } /> );
		}

		const {
			attributes,
			setAttributes,
			isSelected,
		} = props;

		if ( supportType !== 'all' && ! attributes[ supportType ] ) {
			return ( <BlockEdit { ...props } /> );
		}

		if ( typeof attributes[ SELECT_ALL_LABEL ] === 'undefined' ) {
			setAttributes( attributes[ SELECT_ALL_LABEL ] );
		}

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected &&
					<InspectorControls>
						<Panel>
							{ 
							<PanelBody title="Select All" initialOpen={ false }>
								{ <PanelRow>
										<ToggleControl
											label="Select all by default"
											help={
												attributes[ DEFAULT_ALL ]
													? 'All options will be selected by default'
													: ''
											}
											checked={ attributes[ DEFAULT_ALL ] }
											onChange={ () => {
												setAttributes( { [ DEFAULT_ALL ] : ! attributes[ DEFAULT_ALL ] } );
											} }
										/>
									</PanelRow> 
								}
								{ <PanelRow>
										<ToggleControl
											label="Enable 'Select All'"
											help={
												attributes[ SELECT_ALL_ENABLED ]
													? 'Enabled.'
													: 'Disabled.'
											}
											checked={ attributes[ SELECT_ALL_ENABLED ] }
											onChange={ () => {
												setAttributes( { [ SELECT_ALL_ENABLED ] : ! attributes[ SELECT_ALL_ENABLED ] } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ SELECT_ALL_ENABLED ] &&
									<PanelRow>
										<ToggleControl
											label="Add as buttons"
											help={
												attributes[ ADD_AS_BUTTONS ]
													? '"Select All" and "Deselect All" buttons will be added'
													: 'The first option will be a "Select All" option'
											}
											checked={ attributes[ ADD_AS_BUTTONS ] }
											onChange={ () => {
												setAttributes( { [ ADD_AS_BUTTONS ] : ! attributes[ ADD_AS_BUTTONS ] } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ SELECT_ALL_ENABLED ] &&
									<PanelRow>
										<TextControl
											label="Select All label"
											help={ '' }
											value={ attributes[ SELECT_ALL_LABEL ] }
											onChange={ newValue => {
												setAttributes( { [ SELECT_ALL_LABEL ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ SELECT_ALL_ENABLED ] && attributes[ ADD_AS_BUTTONS ] &&
									<PanelRow>
										<TextControl
											label="Deselect All label"
											help={ '' }
											value={ attributes[ DESELECT_ALL_LABEL ] }
											onChange={ newValue => {
												setAttributes( { [ DESELECT_ALL_LABEL ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
							</PanelBody>
							}
						</Panel>
					</InspectorControls>
				}
			</>
		);
	};

}, 'addControls' );

addFilter(
	'editor.BlockEdit',
	'jfb-select-all-options/editor-controls',
	addControls
);
