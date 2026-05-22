import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { InventoryUnit } from '../../pages/inventory/components/inventory-modal/models/inventory.model';


@Pipe({
  name: 'unitLabel',
  standalone: true
})
export class UnitLabelPipe
  implements PipeTransform {

  transform(
    value: InventoryUnit
  ): string {

    switch (value) {

      case InventoryUnit.GRAMA:
        return 'g';

      case InventoryUnit.QUILOGRAMA:
        return 'Kg';

      case InventoryUnit.UNIDADE:
        return 'Un.';

      case InventoryUnit.METRO:
        return 'm';

      case InventoryUnit.LITRO:
        return 'L';

      default:
        return value;
    }
  }
}