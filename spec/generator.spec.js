const ks = require('../index')

describe('The function getGeneratedModel()', () => {
    var fieldModel;

    beforeEach(() => {
        fieldModel = new ks.FieldModelBuilder({
            name: new ks.SeedFaker(ks.FAKER.NAME),
            email: new ks.SeedFaker('internet.email'),
            eval: new ks.SeedRange(2, 5),
            array: [2, 3, 4, 9, 78, 12],
            role: () => {
                return 'user'
            },
            is_admin: false,
            country: 'Cuba',
            birthday: new Date(),
        })
    });

    it('should adds a new field', () => {
        fieldModel.addField('school', ['Columbia', 'Howards'])

        expect(fieldModel.build).toEqual(jasmine.objectContaining({ school: jasmine.any(Array) }))
    });

    it('should return the apropriate types', () => {
        var gm = ks.Generator.getGeneratedModel(fieldModel.build)

        expect(gm).toEqual(jasmine.objectContaining({
            fields: [
                'name', 'email', 'eval', 'array', 'role', 'is_admin', 'country', 'birthday'
            ],
            types: [
                jasmine.any(String), jasmine.any(String), jasmine.any(Number), jasmine.any(Number), jasmine.any(String),
                jasmine.any(Boolean), jasmine.any(String), jasmine.any(Date)
            ]
        }));
    })
})