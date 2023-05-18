import { ElementType, useRef, useState } from 'react'
import {
  useFloating,
  useInteractions,
  useHover,
  arrow,
  offset,
  shift,
  safePolygon,
  FloatingPortal,
  FloatingArrow,
  autoUpdate,
  type Placement
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  className?: string
  children: React.ReactNode
  renderPopover: React.ReactNode
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

const ARROW_HEIGHT = 7
const GAP = 2

function Popover({
  className,
  renderPopover,
  children,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(ARROW_HEIGHT + GAP),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  })

  const hover = useHover(context, {
    handleClose: safePolygon()
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
              >
                <FloatingArrow ref={arrowRef} context={context} fill='white' />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
