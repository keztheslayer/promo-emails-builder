// Specs: https://documentation.mjml.io/#mj-button
import type grapesjs from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeColumn } from './Column';
import { type as typeHero } from './Hero';

export const type = 'mj-button';

export default (editor:  grapesjs.Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'button'),
        draggable: componentsToQuery([typeColumn, typeHero]),
        highlightable: false,
        stylable: ['width', 'height',
          'background-color', 'container-background-color',
          'font-style', 'font-size', 'font-weight', 'font-family', 'color', 'line-height',
          'text-decoration', 'align',
          'vertical-align', 'text-transform',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
          'border', 'border-width', 'border-style', 'border-color',],
        'style-default': {
          'background-color': '#1D9EF9',
          'border-radius': '6px',
          'font-size': '16px',
          'line-height': '26px',
          'font-weight': '600',
          'color': '#ffffff',
          'vertical-align': 'middle',
          'padding-top': '17px',
          'padding-bottom': '17px',
          'padding-right': '32px',
          'padding-left': '32px',
          'align': 'center',
        },
        traits: ['href'],
        // 'container-background-color', 'inner-padding'
      },
    },

    view: {
      ...coreMjmlView,
      tagName: 'tr',
      attributes: {
        style: 'display: table; width: 100%',
      },

      getMjmlTemplate() {
        return {
          start: `<mjml><mj-body><mj-column>`,
          end: `</mj-column></mj-body></mjml>`,
        };
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('tr').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },

      /**
       * Prevent content repeating
       */
       rerender() {
        this.render();
      },
    },
  });
};
