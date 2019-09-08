import csv

from species.models import Species

def load_data(file_path):
    with open(file_path) as f:
        reader = csv.DictReader(f)
        Species
        for i in reader:
            if not i["中"]:
                continue
            x = Species()
            x.name_cn = i["中"]
            x.name_en = i["英文"]
            x.name_jp = i["日文"]
            x.domain_cn = i["域"]
            x.domain = i["域-latin"]
            x.kingdom_cn = i["界"]
            x.kingdom = i["界-latin"]
            x.phylum_cn = i["門"]
            x.phylum = i["門-latin"]
            x.subphylum_cn = i["亞門"]
            x.subphylum = i["-latin"]
            x.clazz_cn = i["綱"]
            x.clazz = i["綱-latin"]
            x.subclass_cn = i["亞綱"]
            x.subclass = i["亞綱-latin"]
            x.order_cn = i["目"]
            x.order = i["目-latin"]
            x.family_cn = i["科"]
            x.family = i["科-latin"]
            x.subfamily_cn = i["亞科"]
            x.subfamily = i["亞科-latin"]
            x.genus_cn = i["屬"]
            x.genus = i["屬-latin"]
            x.species_cn = i["種"]
            x.species = i["種-latin"]
            x.save()


load_data("data/食物系統分類.csv")


