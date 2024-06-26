import { 
		SUPPORTED_BLOCKS,
		FLATPICKR_ENABLED,
		FLATPICKR_24HOUR,
		FLATPICKR_MIN_INC,
		FLATPICKR_DISABLED_WEEKDAYS,
		FLATPICKR_FORMAT,
		DATE_FIELD,
		TIME_FIELD,
		FLATPICKR_ADVANCED_CONFIG,
	} from './constants';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;
const {
	TextControl,
	ToggleControl,
	Panel,
	PanelRow,
	PanelBody,
	__experimentalNumberControl: NumberControl,
	TextareaControl,
	ExternalLink,
} = wp.components;

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

		const advancedConfigHelp = <>
			{ "Advanced config in JSON format." }
			&nbsp;
			{ "See" }
			&nbsp;
			<ExternalLink
				href="https://flatpickr.js.org/options/"
			>
				{ "list of options" }.
			</ExternalLink> { "Only non-function/non-object options can be set this way. Use 'jfb-flatpickr.input.params' filter to set all options." }
		</>;

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected &&
					<InspectorControls>
						<Panel>
							{ 
							<PanelBody title="Flatpickr Settings" initialOpen={ false }>
								{ <PanelRow>
										<ToggleControl
											label="Flatpickr enabled"
											help={
												attributes[ FLATPICKR_ENABLED ]
													? ''
													: ''
											}
											checked={ attributes[ FLATPICKR_ENABLED ] }
											onChange={ () => {
												setAttributes( { [ FLATPICKR_ENABLED ] : ! attributes[ FLATPICKR_ENABLED ] } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ FLATPICKR_ENABLED ] && blockName !== 'jet-forms/date-field' &&
									<PanelRow>
										<ToggleControl
											label="24h time format"
											help={
												attributes[ FLATPICKR_24HOUR ]
													? ''
													: ''
											}
											checked={ attributes[ FLATPICKR_24HOUR ] }
											onChange={ () => {
												setAttributes( { [ FLATPICKR_24HOUR ] : ! attributes[ FLATPICKR_24HOUR ] } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ FLATPICKR_ENABLED ] && blockName !== DATE_FIELD &&
									<PanelRow>
										<NumberControl
											label="Minute increment"
											labelPosition="top"
											value={ attributes[ FLATPICKR_MIN_INC ] }
											onChange={ ( newValue ) => {
												setAttributes( { [ FLATPICKR_MIN_INC ]: parseInt( newValue ) } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ FLATPICKR_ENABLED ] &&
									<PanelRow>
										<TextControl
											label="Visible date format"
											help={ '' }
											value={ attributes[ FLATPICKR_FORMAT ] }
											onChange={ newValue => {
												setAttributes( { [ FLATPICKR_FORMAT ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ FLATPICKR_ENABLED ] && blockName !== TIME_FIELD &&
									<PanelRow>
										<TextControl
											label="Disabled week days"
											help={ 'Comma-separated day numbers; Sunday is 0, Saturday is 6' }
											value={ attributes[ FLATPICKR_DISABLED_WEEKDAYS ] }
											onChange={ newValue => {
												setAttributes( { [ FLATPICKR_DISABLED_WEEKDAYS ] : newValue.replaceAll( /[^\d,]/g, '' ) } );
											} }
										/>
									</PanelRow> 
								}
								{ attributes[ FLATPICKR_ENABLED ] &&
									<PanelRow>
										<TextareaControl
											label="Advanced config"
											help={ advancedConfigHelp }
											value={ attributes[ FLATPICKR_ADVANCED_CONFIG ] }
											onChange={ newValue => {
												setAttributes( { [ FLATPICKR_ADVANCED_CONFIG ] : newValue } );
											} }
											rows="8"
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
	'jfb-flatpickr/editor-controls',
	addControls
);
