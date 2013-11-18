Ext.define('Contato',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'nome', type: 'string'},
            {name: 'sobrenome', type: 'string'}
    ],

    hasMany: {model: 'Telefone', name: 'telefones', foreignKey: 'contatoId'}
});

Ext.define('Telefone',{
    extend: 'Ext.data.Model',

    fields: [
            {name: 'id', type: 'int'},
            {name: 'ddd', type: 'string'},
            {name: 'numero', type: 'string'},
            {name: 'contatoId', type: 'int'}
    ]
});

Ext.define('AssociatedWriter', {
    extend: 'Ext.data.writer.Json',
    alias: 'writer.associatedjson',
 
 
    constructor: function(config) {
        this.callParent(arguments);
    },
 
    getRecordData: function (record, operation) {
        record.data = this.callParent(arguments);
        Ext.apply(record.data, record.getAssociatedData());
        return record.data;
    }
});

Ext.define('Contatos',{
    extend: 'Ext.data.Store',
    model: 'Contato',
    proxy: {
        type: 'ajax',

        api: {
            create: 'php/json/criaContato.php', //CRUD
            read: 'php/json/listaContatos.php',
            update: 'php/json/atualizaContato.php',
            destroy: 'php/json/deletaContato.php',
        },
        
        reader: {
            type: 'json',
            root: 'contatos'
        },

        writer: {
            type: 'associatedjson', //nosso Writer customizado
            root: 'contatos',
            writeAllFields: true,
            encode: true,
            allowSingle: false
        }
    }
})

Ext.onReady(function(){

        var store = Ext.create('Contatos');

        var novoTelefone01 = Ext.create('Telefone',{
        	ddd: '11',
        	numero: '9 9999-9999'
        });

        var novoTelefone02 = Ext.create('Telefone',{
        	ddd: '11',
        	numero: '9 8888-8888'
        });

        var novoContato = Ext.create('Contato',{
        	nome: 'Loiane',
        	sobrenome: 'Groner'
        });

        novoContato.telefones().add(novoTelefone01);
        novoContato.telefones().add(novoTelefone02);

        store.add(novoContato);

        store.sync();
});   