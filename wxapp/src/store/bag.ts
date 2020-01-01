import {observable, action, computed} from 'mobx';

class bagStore {
  @observable selectedSpecies = new Map();
  @observable total = 0;
  @observable kingdomCount = 0;
  @observable clazzCount = 0;

  @action.bound
  updateBySpecies(item) {
    if (this.selectedSpecies.has(item.id)) {
      this.selectedSpecies.delete(item.id)
    } else {
      this.selectedSpecies.set(item.id, item)
    }
    console.log("species updated", this.selectedSpecies)

    this.total = this.selectedSpecies.size

    let kingdoms = new Set()
    this.selectedSpecies.forEach((item) => {
      kingdoms.add(item.kingdom)
    })
    this.kingdomCount = kingdoms.size
    console.log('count kingdoms', kingdoms)

    let classes = new Set()
    this.selectedSpecies.forEach((item) => {
      classes.add(item.clazz)
    })
    this.clazzCount = classes.size
    console.log('count classes', classes)
  }

  @action.bound hasSelected(id) {
    console.log('check selected', id, this.selectedSpecies.has(id))
    return this.selectedSpecies.has(id)
  }

  @action.bound remove(id) {
    this.selectedSpecies.delete(id)
  }

  @action.bound clear() {
    this.selectedSpecies.clear()
    this.total = 0
    this.kingdomCount = 0
    this.clazzCount = 0
  }
}

export default new bagStore()
