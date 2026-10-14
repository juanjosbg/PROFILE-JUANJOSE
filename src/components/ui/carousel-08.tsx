import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Language } from "@/types/certificate";

interface CardItem {
  id: string;
  content: ReactNode;
}

// Adapted from the supplied carousel-08: content comes from the portfolio data.
export default function AppleCardCarousel({
  cards,
  language,
  title,
}: {
  cards: CardItem[];
  language: Language;
  title: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const text =
    language === "es"
      ? {
          previous: "Certificados anteriores",
          next: "Siguientes certificados",
          slide: "Certificado",
        }
      : {
          previous: "Previous certificates",
          next: "Next certificates",
          slide: "Certificate",
        };

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="w-full min-w-0 py-5 sm:py-10">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 sm:mb-8">
        {title}
      </h2>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        aria-label={title}
        className="w-full"
      >
        <CarouselContent className="-ml-6 py-4">
          {cards.map((card, index) => (
            <CarouselItem
              key={card.id}
              className="pl-6 basis-auto"
              onFocusCapture={() => api?.scrollTo(index)}
              aria-label={`${text.slide} ${index + 1} / ${cards.length}`}
            >
              {card.content}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label={text.previous}
          className="h-10 w-10 rounded-full bg-background disabled:cursor-default"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          aria-label={text.next}
          className="h-10 w-10 rounded-full bg-background disabled:cursor-default"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
