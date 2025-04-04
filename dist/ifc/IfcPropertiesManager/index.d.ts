import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "@thatopen/fragments";
import { Component, Disposable, Event, Components } from "../../core";
import { IfcRelation } from "../IfcRelationsIndexer";
/**
 * Types for boolean properties in IFC schema.
 */
export type BooleanPropTypes = "IfcBoolean" | "IfcLogical";
/**
 * Types for string properties in IFC schema.
 */
export type StringPropTypes = "IfcText" | "IfcLabel" | "IfcIdentifier";
/**
 * Types for numeric properties in IFC schema.
 */
export type NumericPropTypes = "IfcInteger" | "IfcReal";
/**
 * Interface representing a map of changed entities in a model. The keys are model UUIDs, and the values are sets of express IDs of changed entities.
 */
export interface ChangeMap {
    [modelID: string]: Set<number>;
}
/**
 * Interface representing a map of attribute listeners. The keys are model UUIDs, and the values are objects with express IDs as keys, and objects with attribute names as keys, and Event objects as values.
 */
export interface AttributeListener {
    [modelID: string]: {
        [expressID: number]: {
            [attributeName: string]: Event<String | Boolean | Number>;
        };
    };
}
/**
 * Component to manage and edit properties and Psets in IFC files.
 */
export declare class IfcPropertiesManager extends Component implements Disposable {
    /**
     * A unique identifier for the component.
     * This UUID is used to register the component within the Components system.
     */
    static readonly uuid: "58c2d9f0-183c-48d6-a402-dfcf5b9a34df";
    /** {@link Disposable.onDisposed} */
    readonly onDisposed: Event<string>;
    /**
     * Event triggered when a file is requested for export.
     */
    readonly onRequestFile: Event<unknown>;
    /**
     * ArrayBuffer containing the IFC data to be exported.
     */
    ifcToExport: ArrayBuffer | null;
    /**
     * Event triggered when an element is added to a Pset.
     */
    readonly onElementToPset: Event<{
        model: FragmentsGroup;
        psetID: number;
        elementID: number;
    }>;
    /**
     * Event triggered when a property is added to a Pset.
     */
    readonly onPropToPset: Event<{
        model: FragmentsGroup;
        psetID: number;
        propID: number;
    }>;
    /**
     * Event triggered when a Pset is removed.
     */
    readonly onPsetRemoved: Event<{
        model: FragmentsGroup;
        psetID: number;
    }>;
    /**
     * Event triggered when data in the model changes.
     */
    readonly onDataChanged: Event<{
        model: FragmentsGroup;
        expressID: number;
    }>;
    /**
     * Configuration for the WebAssembly module.
     */
    wasm: {
        path: string;
        absolute: boolean;
    };
    /** {@link Component.enabled} */
    enabled: boolean;
    /**
     * Map of attribute listeners.
     */
    attributeListeners: AttributeListener;
    /**
     * The currently selected model.
     */
    selectedModel?: FragmentsGroup;
    /**
     * Map of changed entities in the model.
     */
    changeMap: ChangeMap;
    constructor(components: Components);
    /** {@link Disposable.dispose} */
    dispose(): void;
    /**
     * Static method to retrieve the IFC schema from a given model.
     *
     * @param model - The FragmentsGroup model from which to retrieve the IFC schema.
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @returns The IFC schema associated with the given model.
     */
    static getIFCSchema(model: FragmentsGroup): import("@thatopen/fragments").IfcSchema;
    /**
     * Method to add or update entity attributes in the model.
     *
     * @param model - The FragmentsGroup model in which to set the properties.
     * @param dataToSave - An array of objects representing the properties to be saved.
     * Each object must have an `expressID` property, which is the express ID of the entity in the model.
     * The rest of the properties will be set as the properties of the entity.
     *
     * @returns A promise that resolves when all the properties have been set.
     *
     * @throws Will throw an error if any of the `expressID` properties are missing in the `dataToSave` array.
     */
    setData(model: FragmentsGroup, ...dataToSave: Record<string, any>[]): Promise<void>;
    /**
     * Creates a new Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the Pset.
     * @param name - The name of the Pset.
     * @param description - (Optional) The description of the Pset.
     *
     * @returns A promise that resolves with an object containing the newly created Pset and its relation.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newPset(model: FragmentsGroup, name: string, description?: string): Promise<{
        pset: WEBIFC.IFC4.IfcPropertySet | WEBIFC.IFC2X3.IfcPropertySet | WEBIFC.IFC4X3.IfcPropertySet;
    }>;
    /**
     * Removes a Property Set (Pset) from the given model.
     *
     * @param model - The FragmentsGroup model from which to remove the Pset.
     * @param psetID - The express IDs of the Psets to be removed.
     *
     * @returns A promise that resolves when all the Psets have been removed.
     *
     * @throws Will throw an error if any of the `expressID` properties are missing in the `psetID` array.
     * @throws Will throw an error if the Pset to be removed is not of type `IFCPROPERTYSET`.
     * @throws Will throw an error if no relation is found between the Pset and the model.
     */
    removePset(model: FragmentsGroup, ...psetID: number[]): Promise<void>;
    /**
     * Creates a new single-value property of type string in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a string property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a string.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleStringProperty(model: FragmentsGroup, type: StringPropTypes, name: string, value: string): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Creates a new single-value property of type numeric in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a numeric property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a number.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleNumericProperty(model: FragmentsGroup, type: NumericPropTypes, name: string, value: number): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Creates a new single-value property of type boolean in the given model.
     *
     * @param model - The FragmentsGroup model in which to create the property.
     * @param type - The type of the property value. Must be a boolean property type.
     * @param name - The name of the property.
     * @param value - The value of the property. Must be a boolean.
     *
     * @returns The newly created single-value property.
     *
     * @throws Will throw an error if the IFC schema is not found in the model.
     * @throws Will throw an error if no OwnerHistory is found in the model.
     */
    newSingleBooleanProperty(model: FragmentsGroup, type: BooleanPropTypes, name: string, value: boolean): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
    /**
     * Removes a property from a Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model from which to remove the property.
     * @param psetID - The express ID of the Pset from which to remove the property.
     * @param propID - The express ID of the property to be removed.
     *
     * @returns A promise that resolves when the property has been removed.
     *
     * @throws Will throw an error if the Pset or the property to be removed are not found in the model.
     * @throws Will throw an error if the Pset to be removed is not of type `IFCPROPERTYSET`.
     */
    removePsetProp(model: FragmentsGroup, psetID: number, propID: number): Promise<void>;
    /**
     * @deprecated Use indexer.addEntitiesRelation instead. This will be removed in future releases.
     */
    addElementToPset(model: FragmentsGroup, psetID: number, ...expressIDs: number[]): void;
    /**
     * Adds elements to a Property Set (Pset) in the given model.
     *
     * @param model - The FragmentsGroup model in which to add the elements.
     * @param psetID - The express ID of the Pset to which to add the elements.
     * @param elementID - The express IDs of the elements to be added.
     *
     * @returns A promise that resolves when all the elements have been added.
     *
     * @throws Will throw an error if the Pset or the elements to be added are not found in the model.
     * @throws Will throw an error if the Pset to be added to is not of type `IFCPROPERTYSET`.
     * @throws Will throw an error if no relation is found between the Pset and the model.
     */
    addPropToPset(model: FragmentsGroup, psetID: number, ...propID: number[]): Promise<void>;
    /**
     * Creates a new instance of a relationship between entities in the IFC model.
     *
     * @param model - The FragmentsGroup model in which to create the relationship.
     * @param type - The type of the relationship to create.
     * @param relatingID - The express ID of the entity that is related to the other entities.
     * @param relatedIDs - The express IDs of the entities that are related to the relating entity.
     *
     * @returns A promise that resolves with the newly created relationship.
     *
     * @throws Will throw an error if the relationship type is unsupported.
     */
    createIfcRel(model: FragmentsGroup, type: IfcRelation, relatingID: number, relatedIDs: number[]): Promise<any>;
    /**
     * Saves the changes made to the model to a new IFC file.
     *
     * @param model - The FragmentsGroup model from which to save the changes.
     * @param ifcToSaveOn - The Uint8Array representing the original IFC file.
     *
     * @returns A promise that resolves with the modified IFC data as a Uint8Array.
     *
     * @throws Will throw an error if any issues occur during the saving process.
     */
    saveToIfc(model: FragmentsGroup, ifcToSaveOn: Uint8Array): Promise<Uint8Array>;
    /**
     * Retrieves all the entities of a specific type from the model and returns their express IDs wrapped in Handles.
     * This is used to make references of an entity inside another entity attributes.
     *
     * @param model - The FragmentsGroup model from which to retrieve the entities.
     * @param type - The type of the entities to retrieve. This should be the express ID of the IFC type.
     *
     * @returns A promise that resolves with an array of Handles, each containing the express ID of an entity of the specified type.
     * @returns null if the model doesn't have any entity of that type
     */
    getEntityRef(model: FragmentsGroup, type: number): Promise<WEBIFC.Handle<unknown>[] | null>;
    /**
     * Sets an attribute listener for a specific attribute of an entity in the model.
     * The listener will trigger an event whenever the attribute's value changes.
     *
     * @param model - The FragmentsGroup model in which to set the attribute listener.
     * @param expressID - The express ID of the entity for which to set the listener.
     * @param attributeName - The name of the attribute for which to set the listener.
     *
     * @returns The event that will be triggered when the attribute's value changes.
     *
     * @throws Will throw an error if the entity with the given expressID doesn't exist.
     * @throws Will throw an error if the attribute is an array or null, and it can't have a listener.
     * @throws Will throw an error if the attribute has a badly defined handle.
     */
    setAttributeListener(model: FragmentsGroup, expressID: number, attributeName: string): Promise<Event<String | Number | Boolean>>;
    private getNewExpressID;
    private newGUID;
    getOwnerHistory(model: FragmentsGroup): Promise<{
        entity: {
            [attribute: string]: any;
        };
        handle: WEBIFC.Handle<unknown>;
    }>;
    registerChange(model: FragmentsGroup, ...expressID: number[]): void;
    newSingleProperty(model: FragmentsGroup, type: string, name: string, value: string | number | boolean): Promise<WEBIFC.IFC4.IfcPropertySingleValue | WEBIFC.IFC2X3.IfcPropertySingleValue | WEBIFC.IFC4X3.IfcPropertySingleValue>;
}
export * from "./src";
