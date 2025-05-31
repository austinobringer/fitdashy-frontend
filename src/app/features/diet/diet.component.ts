import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { TestService } from '../../core/services/test.service';
import { firstValueFrom } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-diet',
  imports: [HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.scss'
})
export class DietComponent implements OnInit {

  sidebarGroups = [
    {
      groupName: 'Main',
      links: [
        { name: 'My Diet', route: 'my-diet', icon: 'https://img.icons8.com/?size=30&id=67233&format=png&color=ffffff' }
      ]
    },
    {
      groupName: 'Browse',
      links: [
        { name: 'Meals', route: 'meals', icon: 'https://img.icons8.com/?size=30&id=8439&format=png&color=ffffff' },
        { name: 'Ingredients', route: 'ingredients', icon: 'https://img.icons8.com/?size=30&id=8377&format=png&color=ffffff' }
      ]
    }
  ];

  constructor(private testService: TestService, private router: Router) { }

  ngOnInit(): void {
    this.sendTestRequest(); // Send a test request
  }

  async sendTestRequest(): Promise<void> {
    try {
      const data = await firstValueFrom(this.testService.test());
    } catch (e) {
    }
  }

}
