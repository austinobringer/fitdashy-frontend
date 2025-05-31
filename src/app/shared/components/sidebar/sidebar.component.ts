import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface SidebarLink {
  name: string;
  route: string;
  icon: string;
}

export interface SidebarGroup {
  groupName: string;
  links: SidebarLink[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() groups: SidebarGroup[] = [];
  collapsed = false;

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
