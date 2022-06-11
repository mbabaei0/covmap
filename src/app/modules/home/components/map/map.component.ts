import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as leaf from 'leaflet';
import { Filter } from '../../models/filter.type';
import { CovidStat } from '../../models/stat.model';
import { ApiService } from '../../services/api.service';

// can be passed by inputs
const MAP_COLOR =  '#72cef066';
const BORDER_COLOR =  'green';
const HOVER_COLOR =  'red';
@Component({
  selector: 'cov-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() countryId: string;
  @Input() filter: Filter;
  @Input() data: CovidStat[];

  @Output() select: EventEmitter<any> = new EventEmitter();

  layers = [];
  currentTheme: any;
  alive = true;
  selectedCountry = null;

  options = {
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: false,
    center: leaf.latLng({ lat: 38.991709, lng: -76.886109 }),
    maxBounds: new leaf.LatLngBounds(
      new leaf.LatLng(-89.98155760646617, -180),
      new leaf.LatLng(89.99346179538875, 180),
    ),
    maxBoundsViscosity: 1.0,
  };
  constructor(private apiService: ApiService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.layers.length) return
    this.data.forEach(d => {
      // const featureLayer = this.layers.find(l => { console.log(l.feature.properties.name , d.country); return l.feature.properties.name == d.country})
      const featureLayer = this.findFeatureLayerByCountryName(d.country)

      if(featureLayer) this.paintFeature(featureLayer,this.getColor(d.percent))
    })
    this.selectFeature(this.findFeatureLayerByCountryName(this.countryId));
  }

  ngOnInit(): void {
    this.apiService.getLeafLeatCords().subscribe(res => {
      this.layers = [this.createGeoJsonLayer(res)];
      this.selectFeature(this.findFeatureLayerByCountryName(this.countryId));
    })
  }

  mapReady(map: leaf.Map) {
    map.addControl(leaf.control.zoom({ position: 'topright' }));
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  private getColor(value){
    //value from 0 to 1
    const hue=((1-(value/50))*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}
  private createGeoJsonLayer(cords: any) {
    return leaf.geoJSON(
      cords as any,
      {
        style: () => ({
          weight: 1,
          fillColor: 'black',
          fillOpacity: 1,
         //  color: BORDER_COLOR,
          opacity: 1,
        }),
        onEachFeature: (f, l) => {
          this.onEachFeature(f, l);
        },
      });
  }

  private onEachFeature(feature, layer) {
    layer.on({
      mouseover: (e) => this.highlightFeature(e.target),
      mouseout: (e) => this.moveout(e.target),
      click: (e) => this.selectFeature(e.target),
    });
  }

  private highlightFeature(featureLayer) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: 3,
       //fillColor: BORDER_COLOR,
       color: HOVER_COLOR,
      });

      if (!leaf.Browser.ie && !leaf.Browser.opera12 && !leaf.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
  }
  private resetHighlight(featureLayer) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: 1,
       fillColor: featureLayer.options.fillColor,
         color: 'blue',
      });

      if (!leaf.Browser.ie && !leaf.Browser.opera12 && !leaf.Browser.edge) {
        featureLayer.bringToFront();
      }
    }
  }
  private paintFeature(featureLayer, color) {
    if (featureLayer) {
      featureLayer.setStyle({
        weight: 1,
        fillColor: color,
      });

    }
  }

  private moveout(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(featureLayer);

      // When countries have common border we should highlight selected country once again
      this.highlightFeature(this.selectedCountry);
    }
  }


  private selectFeature(featureLayer) {
    if (featureLayer !== this.selectedCountry) {
      this.resetHighlight(this.selectedCountry);
      this.highlightFeature(featureLayer);
      this.selectedCountry = featureLayer;
      this.select.emit(featureLayer.feature.properties);
    }
  }

  private findFeatureLayerByCountryId(id) {
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
      return item.feature.id === id;
    });

    return featureLayer ? featureLayer : null;
  }
  private findFeatureLayerByCountryName(name) {
    const layers = this.layers[0].getLayers();
    const featureLayer = layers.find(item => {
      return item.feature.properties.name === name || item.feature.id == name
    });

    return featureLayer ? featureLayer : null;
  }
}
