import { PLANT_TYPES } from '../../constants';
import { convertPlantType } from '../plantType';

describe('Convert enum plant type into locale label', () => {
    it('should return correct locale label for biomass', () => {
        const biomass = convertPlantType(PLANT_TYPES.biomass);
        expect(biomass).toEqual({
            defaultMessage: 'Biomass',
            id: 'app.plantType.biomass'
        });
    });

    it('should return correct locale label for solar', () => {
        const solar = convertPlantType(PLANT_TYPES.solar);
        expect(solar).toEqual({
            defaultMessage: 'Solar',
            id: 'app.plantType.solar'
        });
    });

    it('should return correct locale label for wind', () => {
        const wind = convertPlantType(PLANT_TYPES.wind);
        expect(wind).toEqual({
            defaultMessage: 'Wind',
            id: 'app.plantType.wind'
        });
    });

    it('should return correct locale label for other types', () => {
        const other = convertPlantType(PLANT_TYPES.other);
        expect(other).toEqual({
            defaultMessage: 'Other',
            id: 'app.plantType.other'
        });
    });
});
