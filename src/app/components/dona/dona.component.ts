import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent {

  @Input() titulo:string = "Sin titulo"

  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };

}
