/**
 *  Created by pw on 2020/9/26 6:12 下午.
 */
export interface HotImageCardIF {
  id: string;
  imageUrl: string;
  address: string;
  tags?: string[];
}

export interface PartnersIF {
  cover: string;
  link: string;
  name: string;
}
