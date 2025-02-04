import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  public nextpage() {
    console.log("");
    this.router.navigate(['../product'], { relativeTo: this.activatedRoute });
    // this.router.navigate(['../product'], { relativeTo: this.router.routerState.root });
  }
}
