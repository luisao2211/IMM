import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    // id: 'dashboard',
    // title: 'Dashboard',
    // type: 'group',
    // icon: 'icon-navigation',
    // children: [
    //   {
    //     id: 'default',
    //     title: 'Default',
    //     type: 'item',
    //     classes: 'nav-item',
    //     url: '/default',
    //     icon: 'ti ti-dashboard',
    //     breadcrumbs: false
    //   }
    // ]
  },
  {
    id: 'page',
    title: 'Paginas',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Autenticación',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/guest/login',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/guest/register',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'Modulo1',
        title: 'Modulo 1',
        type: 'collapse',
        icon: 'ti ti-arrow-bar-to-right',
      },
      {
        id: 'Modulo2',
        title: 'Modulo 2',
        type: 'collapse',
        icon: 'ti ti-arrow-bar-to-right',
      }
      ,{
        id: 'Modulo3',
        title: 'Modulo 3',
        type: 'collapse',
        icon: 'ti ti-arrow-bar-to-right',
      }
      ,{
        id: 'Modulo4',
        title: 'Modulo 4',
        type: 'collapse',
        icon: 'ti ti-arrow-bar-to-right',
      },
      {
        id: 'Catalogos',
        title: 'Catalogos',
        type: 'collapse',
        icon: 'ti ti-box-multiple',
        children: [
          {
            id: 'Generos',
            title: 'Generos',
            type: 'item',
            url: '/catalogos/genero',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Colonias',
            type: 'item',
            url: '/catalogos/colonias',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Estado Civil',
            type: 'item',
            url: '/catalogos/estadosciviles',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Actividades que realiza',
            type: 'item',
            url: '/catalogos/actividades',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Lugares de trabajo',
            type: 'item',
            url: '/catalogos/trabajos',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Servicios Medicos',
            type: 'item',
            url: '/catalogos/serviciosmedicos',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Formación Educativa',
            type: 'item',
            url: '/catalogos/formacioneducativa',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Enfermedades o dificultades de salud',
            type: 'item',
            url: '/catalogos/enfermedades',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Origenes',
            type: 'item',
            url: '/catalogos/origenes',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Discapacidades',
            type: 'item',
            url: '/catalogos/discapacidades',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Viviendas',
            type: 'item',
            url: '/catalogos/viviendas',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Adicciones',
            type: 'item',
            url: '/catalogos/adicciones',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Tipo de violencia',
            type: 'item',
            url: '/catalogos/tipoviolencia',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Ambito violencia',
            type: 'item',
            url: '/catalogos/ambitoviolencia',
            target: false,
            breadcrumbs: false
          },
        ]
      },
    ]
  },
  // {
  //   id: 'elements',
  //   title: 'Elements',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'typography',
  //       title: 'Typography',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/typography',
  //       icon: 'ti ti-typography'
  //     },
  //     {
  //       id: 'color',
  //       title: 'Colors',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/color',
  //       icon: 'ti ti-brush'
  //     },
  //     {
  //       id: 'tabler',
  //       title: 'Tabler',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://tabler-icons.io/',
  //       icon: 'ti ti-plant-2',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'ti ti-brand-chrome'
  //     },
  //     {
  //       id: 'document',
  //       title: 'Document',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/berry-angular/',
  //       icon: 'ti ti-vocabulary',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
