<template>
    <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <v-badge bordered bottom :color="status ? status : 'success'" dot offset-x="10" offset-y="10">
                    <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-avatar>
                </v-badge>

                <span class="ml-3">{{ user.name }}</span>

                <v-icon>mdi-arrow-down-thin</v-icon>
            </span>
        </template>
        
        <v-list>
            <span v-for="(menu, index) in menus" :key="index">
                <v-list-group v-if="menu.submenus">
                    <template v-slot:activator>
                        <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </template>

                    <v-list-item v-for="(submenu, index) in menu.submenus" :key="index" link>
                        <v-list-item-icon>
                            <v-icon color="blue">mdi-star</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-html="submenu.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="submenu.subtitle"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-list-item link v-else>
                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                </v-list-item>
            </span>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'UserMenu',
    data: function () {
        return {
            menus: [
                {
                    title: 'Mis cuentas', 
                    submenus: [
                        {
                            icon: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                            title: '<strong>Sesame 1</strong>&nbsp;Kelly Pierce',
                            subtitle: '<br><small>Hoy llevas 00:00</small>',
                        },
                        {
                            icon: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                            title: '<strong>Sesame 2</strong>&nbsp;Kelly Pierce',
                            subtitle: '<br><small>Hoy llevas 00:00</small>',
                        }
                    ] 
                },
                { title: 'Vista empleado' },
                { title: 'Mi perfil' },
                { title: 'Cerrar sesión' },
            ],
            user: {
                id: "b99a6cd9-3a3d-4635-9eea-e089c90ac45a",
                name: 'Kelly Pierce'
            }
        }
    },
    props: {
        status: {
            type: String,
            required: false,
            default: 'success'
        },
    },
}
</script>