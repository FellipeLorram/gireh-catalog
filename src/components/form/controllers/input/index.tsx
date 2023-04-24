import React from 'react'
import { Wrapper } from './wrapper'
import { Label } from './label'
import { InputComponent } from './input'
import {SelectComponent} from './select'
import { TextAreaComponent } from './textArea'
import { Error } from './error'
import { InputFileComponent } from './inputFile'

export const Input = {
    Wrapper: Wrapper,
    Label: Label,
    Input: InputComponent,
    Select: SelectComponent,
    TextArea: TextAreaComponent,
    Error: Error,
    File: InputFileComponent
}