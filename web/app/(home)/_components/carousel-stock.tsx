"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import { LowStockProducts } from "./low-stock-products";
import { Product } from "@/app/_types/product";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface CarouselStockProps {
  lowQuantityProducts: Product[];
}

export function CarouselStock({ lowQuantityProducts }: CarouselStockProps) {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: true,
    })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={
        {
          // loop: true,
        }
      }
    >
      <CarouselContent className="min-h-[750px]">
        <CarouselItem>
          <LowStockProducts lowStockProducts={lowQuantityProducts} />
        </CarouselItem>
        <CarouselItem>
          <LowStockProducts lowStockProducts={lowQuantityProducts} />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
