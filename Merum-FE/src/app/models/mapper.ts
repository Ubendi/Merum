import { WineFormViewModel } from './view-models';
import { AddWineDTO, UpdateWineDTO, WineDTO } from '../services/wines.service';

export function mapWineVmToAddWineDto(vm: WineFormViewModel): AddWineDTO {
  return {
    name: vm.name,
    year: vm.year,
    description: vm.description,
    locationEntityId: vm.locationEntityId,
    grapeVarietyEntityId: vm.grapeVarietyEntityId,
    relativeDens: vm.relativeDens,
    totalAlc: vm.totalAlc,
    realAlc: vm.realAlc,
    totalExtract: vm.totalExtract,
    totalAcid: vm.totalAcid,
    volatileAcid: vm.volatileAcid,
    totalSDiox: vm.totalSDiox,
    freeSDiox: vm.freeSDiox,
    ph: vm.ph,
    totalSugar: vm.totalSugar,
    sugarFreeExtract: vm.sugarFreeExtract,
    titratableAcid: vm.titratableAcid,
    picturePath: vm.picturePath,
    quantity: vm.quantity,
    archivedFlag: vm.archivedFlag
  };
}

export function mapWineVmToUpdateWineDto(vm: WineFormViewModel): UpdateWineDTO {
  return {
    id: vm.id!,
    ...mapWineVmToAddWineDto(vm)
  };
}

export function mapWineDtoToWineVm(dto: WineDTO): WineFormViewModel {
    return {
      id: dto.id,
      name: dto.name,
      year: dto.year,
      description: dto.description,
      locationEntityId: dto.location.id,
      grapeVarietyEntityId: dto.grapeVariety.id,
      relativeDens: dto.relativeDens,
      totalAlc: dto.totalAlc,
      realAlc: dto.realAlc,
      totalExtract: dto.totalExtract,
      totalAcid: dto.totalAcid,
      volatileAcid: dto.volatileAcid,
      totalSDiox: dto.totalSDiox,
      freeSDiox: dto.freeSDiox,
      ph: dto.ph,
      totalSugar: dto.totalSugar,
      sugarFreeExtract: dto.sugarFreeExtract,
      titratableAcid: dto.titratableAcid,
      picturePath: dto.picturePath,
      quantity: dto.quantity,
      archivedFlag: dto.archivedFlag
    };
  }
