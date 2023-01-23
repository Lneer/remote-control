import {ScreenClass, providerRegistry,MouseClass } from '@nut-tree/nut-js'

export const screen = new ScreenClass(providerRegistry)
export const mouse = new MouseClass(providerRegistry)